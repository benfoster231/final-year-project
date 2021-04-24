package com.exercise.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.exercise.database.entities.Gym;
import com.exercise.database.entities.GymGallery;
import com.exercise.repository.GymGalleryRepository;
import com.exercise.repository.GymRepository;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

@Controller
@RequestMapping("/gym/")
public class GymController {
	
	@Autowired
	private GymRepository gymRepository;
	
	@Autowired
	private GymGalleryRepository gymGalleryRepository;
	
	@Value("${profile.multipart.maxSize}")
	private long profileMaxImageSize;

	@Value("${file.path}")
	private String FILE_PATH;
	
	@Value("${gym.files.path}")
	private String GYM_FILE_PATH;
	
	@Value("${gym.gallery.files.path}")
	private String GYM_GALLERY_FILE_PATH;
	
	@GetMapping(value = "login")
	public String getLoginPage() {
		
		return "login";
	}
	
	@PostMapping(value = "add")
	public String addGym(@RequestParam String username, @RequestParam String password, Model model) {
		
		if(StringUtils.isEmpty(username) || StringUtils.isEmpty(password) || username.trim() == "" || password.trim() == "") 
			return "redirect:/gym/login";
		
		if(username.equals("admin") && password.equals("admin")) {
			model.addAttribute("gyms", gymRepository.findAllByDesc());
			model.addAttribute("gym", new Gym());
			return "redirect:/gym/";
		} else {
			return "redirect:/gym/login";
		}
	}
	
	@GetMapping(value = "")
	public String getGyms(Model model) {
		
		model.addAttribute("gyms", gymRepository.findAllByDesc());
		model.addAttribute("gym", new Gym());
		return "gyms";
	}
	
	/**
	   * Gym Page
	   * @return
	   */
	  @RequestMapping(value = "blog", method = RequestMethod.GET)
	  public String blog(Model model) {
			model.addAttribute("gyms", gymRepository.findAllByDesc());
			model.addAttribute("gym", new Gym());
			model.addAttribute("galleryImages", new ArrayList<>());
		  return "gyms";
	  }
	  
	  @GetMapping(value = "{id}")
	  public String view(@PathVariable("id") Long id, ModelMap modelMap) {
		  Gym gym = null;
		  if(id==null || id==0) {
			  gym = new Gym();
		  } else {
			  gym = gymRepository.findById(id).get();
			  List<GymGallery> galleries = gymGalleryRepository.findByGymId(id);
			  List<String> photos = new ArrayList<>();
			  if(!CollectionUtils.isEmpty(galleries)) {
				  for (GymGallery gymGallery : galleries) {
					  photos.add(gymGallery.getImagePath());
				  }
				  modelMap.addAttribute("galleryImages", photos);
			  }
		  }
	      modelMap.addAttribute("gym", gym);
	      return "gyms :: view";
	  }
	  
	  /**
	   * Add/Edit gym
	   * @param gym
	   * @param bindingResult
	   * @param model
	   * @return
	   * @throws IOException 
	   * @throws IllegalStateException 
	   */
	  @PostMapping(value = "addGym")
	  public String addEditBlog(@Valid Gym gym, BindingResult bindingResult, Model model, @RequestParam("image") MultipartFile image, @RequestParam("images") List<MultipartFile> images) throws IllegalStateException, IOException {
	    if (bindingResult.hasErrors()) {
	        return "gyms :: view";
	    }
	    
	    Gym duplicateTitle = gymRepository.findByName(gym.getName());
	    if(gym.getId() == null) {
	        if (duplicateTitle != null)
	          bindingResult.rejectValue("name", "error.blog", "Gym name is already exist");
	    } else {
	    	Gym editGym = gymRepository.findById(gym.getId()).get();
	        if (!editGym.getName().equals(gym.getName())) {
	          if (duplicateTitle != null)
	            bindingResult.rejectValue("name", "error.blog", "Gym name is already exist");
	        }
	        gym.setCreatedDatetime(editGym.getCreatedDatetime());
	    }
	    if (bindingResult.hasErrors()) 
	        return "gyms :: view";
	    List<String> photos = new ArrayList<>();
	    if(gym.getId() == null) {
    		if (image.isEmpty()) 
            	bindingResult.rejectValue("imagePath", "error.imagePath", "Please upload an image");
        	if (image.getSize() > profileMaxImageSize) 
        		bindingResult.rejectValue("imagePath", "error.imagePath", "Image size should less than 5mb");
            if (bindingResult.hasErrors()) 
                return "gyms :: view";
        	if (!new File(FILE_PATH+GYM_FILE_PATH).exists())
        		new File(FILE_PATH+GYM_FILE_PATH).mkdir();

        	if (image.getOriginalFilename().length() > 0) {
        		String membershipImgPath = GYM_FILE_PATH + new Date().getTime() + "_" + image.getOriginalFilename().replaceAll(" ", "-");
//        		   File file = new File(FILE_PATH + membershipImgPath);
//        		   OutputStream out = new FileOutputStream(file);
//        		   // Write your data
//        		   out.close();
        		image.transferTo(new File(FILE_PATH + membershipImgPath));
        		gym.setImagePath(membershipImgPath);
        	}
	    } else {
	    	if(gym.getId() != null && image.isEmpty()) {
	        	
	        } else {
	        	if (image.isEmpty()) 
	            	bindingResult.rejectValue("imagePath", "error.imagePath", "Please upload an image");
	        	if (image.getSize() > profileMaxImageSize) 
	        		bindingResult.rejectValue("imagePath", "error.imagePath", "Image size should less than 5mb");
	            if (bindingResult.hasErrors()) 
	                return "gyms :: view";
	        	if (!new File(FILE_PATH+GYM_FILE_PATH).exists())
	        		new File(FILE_PATH+GYM_FILE_PATH).mkdir();

	        	if (image.getOriginalFilename().length() > 0) {
	        		String membershipImgPath = GYM_FILE_PATH + new Date().getTime() + "_" + image.getOriginalFilename().replaceAll(" ", "-");
	        		image.transferTo(new File(FILE_PATH + membershipImgPath));
	        		gym.setImagePath(membershipImgPath);
	        	}
	        }
	    }
	    if(!CollectionUtils.isEmpty(images)) {
    		for (MultipartFile multipartFile : images) {
    			if(StringUtils.isEmpty(multipartFile.getOriginalFilename())) {
    				continue;
    			}
        		if (multipartFile.isEmpty()) 
                	bindingResult.rejectValue("imagePath", "error.imagePath", "Please upload an image");
            	if (multipartFile.getSize() > profileMaxImageSize) 
            		bindingResult.rejectValue("imagePath", "error.imagePath", "Image size should less than 5mb");
                if (bindingResult.hasErrors()) 
                    return "gyms :: view";
                if (!new File(FILE_PATH+GYM_GALLERY_FILE_PATH).exists())
            		new File(FILE_PATH+GYM_GALLERY_FILE_PATH).mkdir();

            	if (multipartFile.getOriginalFilename().length() > 0) {
            		String membershipImgPath = GYM_GALLERY_FILE_PATH + new Date().getTime() + "_" + multipartFile.getOriginalFilename().replaceAll(" ", "-");
            		multipartFile.transferTo(new File(FILE_PATH + membershipImgPath));
//            		image.transferTo(new File(FILE_PATH + membershipImgPath));
//            		photos.add(membershipImgPath);
//            		File file = new File(FILE_PATH + membershipImgPath);
//            		OutputStream out = new FileOutputStream(file);
            		// Write your data
//            		out.close();
            		photos.add(membershipImgPath);
            	}
			}
    	}
	    
	    gymRepository.save(gym);
	    if(!CollectionUtils.isEmpty(photos)) {
	    	gymGalleryRepository.deleteByGymId(gym.getId());
			for (String string : photos) {
				GymGallery gymGallery = new GymGallery(); 
				gymGallery.setGym(gym);
				gymGallery.setImagePath(string);
				gymGalleryRepository.save(gymGallery);
			}
		}
	    model.addAttribute("success", "Gym has been registered successfully");
	    return "redirect:/gym/";
	  }
	  
	  @RequestMapping(value="files/getImage", method=RequestMethod.GET)
	  public void getImage(HttpServletResponse response,@RequestParam("name") String name ) throws Exception {
			
		  response.setContentType(MediaType.ALL_VALUE);

		  File f = new File(FILE_PATH + name);
		  BufferedImage image = ImageIO.read(f);
		  OutputStream out = response.getOutputStream();
		  ImageIO.write(image, FilenameUtils.getExtension(f.getName()), out);
		  out.close();
	  }
	  
	  /**
	   * Delete gym By Id 
	   */
	  @RequestMapping(value = "delete/{id}", method=RequestMethod.GET)
	  public String deleteMembership (@PathVariable Long id, ModelMap modelMap, RedirectAttributes redirectAttributes) {
		  try {
			  Optional<Gym> gym = gymRepository.findById(id);
			  List<GymGallery> galleries = gymGalleryRepository.findByGymId(gym.get().getId());
			  if(!CollectionUtils.isEmpty(galleries)) {
				  for (GymGallery gymGallery : galleries) {
					  File file = new File(FILE_PATH + gymGallery.getImagePath()); 
					  file.delete();
				}
			  }
			  gymGalleryRepository.deleteByGymId(gym.get().getId());
			  gymRepository.deleteById(id);
			  if(gym.isPresent()) {
				  File file = new File(FILE_PATH + gym.get().getImagePath()); 
				  file.delete();
			  }
			  redirectAttributes.addFlashAttribute("success", "Gym deleted successfully.");
			  return "redirect:/gym/";
		  } catch (Exception e) {
			  return "redirect:/";
		  }
	  }
	
}
