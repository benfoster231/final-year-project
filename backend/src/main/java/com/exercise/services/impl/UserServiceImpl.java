//package com.exercise.services.impl;
//
//import java. sql. Timestamp;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Locale;
//import java.util.Optional;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.MessageSource;
//import org.springframework.context.i18n.LocaleContextHolder;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.ui.ModelMap;
//import org.springframework.util.CollectionUtils;
//import org.springframework.util.StringUtils;
//import org.springframework.web.servlet.LocaleResolver;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//import org.springframework.web.servlet.support.RequestContextUtils;
//
//import com.exercise.database.entities.Authority;
//import com.exercise.database.entities.ConcreteStoreReview;
//import com.exercise.database.entities.Publicuser;
//import com.exercise.database.entities.Review;
//import com.exercise.database.entities.UserDeviceToken;
//import com.exercise.database.entities.UserJWT;
//import com.exercise.enums.Lang;
//import com.exercise.model.DataTableDTO;
//import com.exercise.model.PageSizeSearchObj;
//import com.exercise.model.ResponseGenerator;
//import com.exercise.model.UserDTO;
//import com.exercise.repository.AuthoritiesRepository;
//import com.exercise.repository.ConcreteStoreReviewRepository;
//import com.exercise.repository.NewsRepository;
//import com.exercise.repository.PublicuserRepository;
//import com.exercise.repository.ReviewRepository;
//import com.exercise.repository.UserDeviceTokenRepository;
//import com.exercise.repository.UserRepository;
//import com.exercise.request.ConcreteReviewRequest;
//import com.exercise.request.PaniniReviewRequest;
//import com.exercise.request.SocialMediaRequest;
//import com.exercise.responseDTO.UserResponse;
//import com.exercise.services.PushNotificationService;
//import com.exercise.services.UserService;
//import com.exercise.utils.EncryptDecryptUtils;
//import com.exercise.utils.Response;
//
//@Service
//public class UserServiceImpl implements UserService {
//	
//	@Autowired
//	private UserRepository userRepository;
//	
//	@Autowired
//	private AuthoritiesRepository authoritiesRepository;
//	
//	@Autowired
//	private MessageSource messageSource;
//	
//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
//	
//	@Autowired
//	private HttpServletRequest request;
//
//	@Autowired
//	private HttpServletResponse response;
//	
//	@Autowired
//	private ReviewRepository reviewRepository;
//	
//	@Autowired
//	private ConcreteStoreReviewRepository concreteStoreReviewRepository;
//	
//	@Autowired
//	private PublicuserRepository publicuserRepository;
//	
//	@Autowired
//	private UserDeviceTokenRepository userDeviceTokenRepository;
//	
//	@Autowired
//	private NewsRepository newsRepository;
//	
//	@Autowired
//	private PushNotificationService pushNotificationService;
//	
//	/**
//	 * user-list by pagination and searchable
//	 */
//	@Override
//	public DataTableDTO userlist( HttpServletRequest httpServletRequest) {
//
//		PageSizeSearchObj o = com.exercise.utils.Utils.getPageSizeSearchObj(httpServletRequest);
//
//		Pageable pageable = PageRequest.of(o.getPage(), o.getLength());
//		Page<UserJWT> list = null;
//		if (o.getSearch() != null && o.getSearch().length() > 0) {
//			list = userRepository.findByUsernameContainingOrEmailContainingIgnoreCase(o.getSearch(), o.getSearch(), pageable);
//		} else {
//			list = userRepository.findAll(pageable);
//		}
//		DataTableDTO dataTable = new DataTableDTO();
//		dataTable.setStartFrom(list.getNumber() * list.getSize());
//		dataTable.setRecordsFiltered(list.getTotalElements());
//		dataTable.setRecordsTotal(list.getTotalElements());
//		dataTable.setData(list.getContent());
//		return dataTable;
//	}
//	
//	/**
//	 * save-user
//	 */
//	@Override
//	public void save(UserDTO userDTO, ModelMap modelMap) {
//		
//		UserJWT userJWT = new UserJWT();
//		userJWT.setId(userDTO.getId());
//		userJWT.setFirstname(userDTO.getFirstname());
//		userJWT.setLastname(userDTO.getLastname());
//		userJWT.setUsername(userDTO.getUsername());
//		
//		java.util.List<Authority> list = new ArrayList<Authority>();
//		
////		List<Authority> authorities = authoritiesRepository.findAll();
//		
////		List<Authority> authorityList = userDTO.getRole();
//		
////		for (Authority authority2 : authorities) {
////			for (Authority authority : authorityList) {
////				
////			if(authority2.getName().toString().equals(authority.getName().toString())) {
////				list.add(authority2);
////				}
////			}
////		}
//		
//		userJWT.setAuthorities(list);
//		userJWT.setEmail(userDTO.getEmail());
//		userJWT.setLastPasswordResetDate(new Date());
//		userJWT.setEnabled(true);
//		userRepository.save(userJWT);
//	}
//	
//	/**
//	 * delete-user
//	 */
//	@Override
//	public String delete(long id, RedirectAttributes redirectAttributes) {
//		
//		Optional<UserJWT> user = userRepository.findById(id);
//		if (user.isPresent()) {
//			userRepository.deleteById(id);
//			redirectAttributes.addFlashAttribute("success", messageSource.getMessage("user.delete.success", new Object[] {}, LocaleContextHolder.getLocale()));
//			return "redirect:/panino/users/list";
//		} else {
//			redirectAttributes.addFlashAttribute("error", messageSource.getMessage("user.not.exist", new Object[] {}, LocaleContextHolder.getLocale()));
//			return "redirect:/panino/users/list";
//		}
//		
//	}
//	 
//	/**
//	 * find all user
//	 */
//	@Override
//	public List<UserDTO> findAllUsers() {
//		List<UserDTO> userDTOs = new ArrayList<>();
//		List<UserJWT> users = userRepository.findAll();
//		if(!CollectionUtils.isEmpty(users)) {
//			for(UserJWT user : users) {
//				UserDTO userDTO = new UserDTO();
//				userDTO.setFirstname(user.getFirstname());
//				userDTO.setLastname(user.getLastname());
//				userDTO.setUsername(user.getUsername());
//				userDTO.setId(user.getId());
//				userDTOs.add(userDTO);
//			}
//		}
//		
//		return userDTOs;
//	}
//	
//	/**
//	 * user find by id
//	 */
//	@Override
//	public UserDTO findById(Long userId) {
//		Optional<UserJWT> optional = userRepository.findById(userId);
//		if(!optional.isPresent()) 
//			return null;
//		UserJWT user = optional.get();
//		UserDTO userDTO = new UserDTO();
//		userDTO.setId(user.getId());
//		userDTO.setEmail(user.getEmail());
//		userDTO.setFirstname(user.getFirstname());
//		userDTO.setLastname(user.getLastname());
//		List<String> roles = new ArrayList<>();
//		for(Authority authority : user.getAuthorities()) {
//			roles.add(authority.getName().toString());
//		}
//		userDTO.setRoles(roles);
//		userDTO.setUsername(user.getUsername());
//		return userDTO;
//	}
//	
//	/**
//	 * save user
//	 */
//	@Override
//	public void save(UserDTO userDTO) {
//		UserJWT userJWT = null;
//		if(userDTO.getId() != null && userDTO.getId() != 0) {
//			userJWT = userRepository.findById(userDTO.getId()).get();
//		} else {
//			userJWT = new UserJWT();
//			userJWT.setLastPasswordResetDate(new Date());
//			userJWT.setEnabled(true);
//		}
//		List<Authority> authorities = new ArrayList<>();
//		List<Authority> autho = authoritiesRepository.findAll();
//		for(Authority auth : autho) {
//			for(String role : userDTO.getRoles()) {
//				if(role.equals(auth.getName().toString())) {
//					authorities.add(auth);
//					break;
//				}
//			}
//		}
//		userJWT.setAuthorities(authorities);
//		userJWT.setId(userDTO.getId());
//		userJWT.setFirstname(userDTO.getFirstname());
//		userJWT.setLastname(userDTO.getLastname());
//		userJWT.setUsername(userDTO.getUsername());
//		userJWT.setEmail(userDTO.getEmail());
//		
//		if(userDTO.getPassword() != null || userDTO.getId() == null)
//			userJWT.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
//		
//		userRepository.save(userJWT);
//		
//	}
//
//	/**
//	 * Set language
//	 */
//	@Override
//	public void setLanguage(Lang lang) {
//		
//		LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
//		localeResolver.setLocale(request, response, new Locale(lang.name()));
//	}
//
//	/**
//	 * save panini review 
//	 */
//	@Override
//	public void getPaniniReview(PaniniReviewRequest paniniReviewRequest,String userFbid) {
//		
//		Review review = new Review();
//		Optional<Review> optional = reviewRepository.findByUserFbidAndPaninoId(userFbid,paniniReviewRequest.getPaniniId());
//		
//		if(optional.isPresent())
//			review = optional.get();
//		
//		review.setDate(new Timestamp( new Date().getTime()));
//		review.setContent(paniniReviewRequest.getText());
//		review.setFlgEnabled(null);
//		review.setPaninoId(paniniReviewRequest.getPaniniId());
//		review.setRatings(paniniReviewRequest.getRating());
//		review.setUserFbid(userFbid);
//		reviewRepository.save(review);
//	}
//	
//	/**
//	 * save concreteStore review
//	 */
//	@Override
//	public void getConcreteStoreReview(ConcreteReviewRequest concreteReviewRequest,String userFbid) {
//		
//		ConcreteStoreReview concreteStoreReview = new ConcreteStoreReview();
//		Optional<ConcreteStoreReview > optional = concreteStoreReviewRepository.findByUserFbidAndConcreteStoreId(userFbid,concreteReviewRequest.getConcreteStoreId());
//		
//		if(optional.isPresent())
//			concreteStoreReview = optional.get();
//		
//		concreteStoreReview.setConcreteStoreId(concreteReviewRequest.getConcreteStoreId());
//		concreteStoreReview.setDate(new Timestamp(new Date().getTime()));
//		concreteStoreReview.setFlgEnabled(null);
//		concreteStoreReview.setRatings(concreteReviewRequest.getRating());
//		concreteStoreReview.setText(concreteReviewRequest.getText());
//		concreteStoreReview.setUserFbid(userFbid);
//		concreteStoreReviewRepository.save(concreteStoreReview);
//		
//	}
//	
//	/**
//	 * user login 
//	 */
//	@Override
//	public ResponseEntity<Response> getUser(String email, String password) {
//		Publicuser publicuser = publicuserRepository.findByEmailIgnoreCase(email);
//		if(publicuser == null){
//			return ResponseGenerator.generateResponse(new Response("invalid.user.email", null), HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		boolean isPasswordCorrect = bCryptPasswordEncoder.matches(password, publicuser.getPassword());
//		if(!isPasswordCorrect) {
//			return ResponseGenerator.generateResponse(new Response("invalid.user.data", null), HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		UserResponse userResponse = UserResponse.getByEntity(publicuser);
//		return ResponseGenerator.generateResponse(new Response("login.user.success", userResponse), HttpStatus.OK);
//	}
//
//	/**
//	 * get social media login
//	 */
//	@Override
//	public ResponseEntity<Response> getSocialUserMedia(SocialMediaRequest socialMediaRequest) {
//	    Publicuser publicuser = null; 
//	    if(socialMediaRequest.getEmail() == null) {
//	        publicuser = publicuserRepository.findByUserFbid(socialMediaRequest.getSocialId()) ;
//	    } else {
//	        publicuser = publicuserRepository.findByEmailIgnoreCase(socialMediaRequest.getSocialId()) ;
//	    }
//		
//		if(publicuser !=null){
//			UserResponse userResponse = UserResponse.getByEntity(publicuser);
//			return ResponseGenerator.generateResponse(new Response("login.user.success", userResponse), HttpStatus.OK);
//		} else {
//			publicuser = new Publicuser();
//			publicuser.setAppToken(socialMediaRequest.getSocialMediaType());
//			if(socialMediaRequest.getEmail() == null) {
//			    publicuser.setEmail(socialMediaRequest.getSocialId());
//			} else {
//			    publicuser.setEmail(socialMediaRequest.getEmail());    
//			}
//			publicuser.setName(socialMediaRequest.getFullName());
//			publicuser.setUserFbid(socialMediaRequest.getSocialId());
//			publicuserRepository.save(publicuser);
//			UserResponse userResponse = UserResponse.getByEntity(publicuser);
//			return ResponseGenerator.generateResponse(new Response("login.user.success", userResponse), HttpStatus.OK);
//		}
//	}
//
//	/**
//	 * get user by email id
//	 */
//	@Override
//	public Publicuser findUserByEmail(String email) {
//		Publicuser publicuser = publicuserRepository.findByEmailIgnoreCase(email);
//		return publicuser;
//	}
//
//	/**
//	 * reset password
//	 */
//	@Override
//	public Boolean resetPassword(String token, String password) {
//			
//		Publicuser user = publicuserRepository.findByUserFbid(EncryptDecryptUtils.decrypt(token));
//		if(user != null) {
//			user.setPassword(bCryptPasswordEncoder.encode(password));
//			publicuserRepository.save(user);
//			return true;
//		}
//		return false;
//
//	}
//
//	/**
//	 * save device token
//	 */
//	@Override
//	public void saveDeviceToken(String deviceToken, String accessToken, Lang lang) {
//
//		Publicuser user = null;
//		UserDeviceToken userDeviceToken = null;
//		
//		if(!StringUtils.isEmpty(accessToken)) {
//			user = publicuserRepository.findByUserFbid(EncryptDecryptUtils.decrypt(accessToken));
//		}
//		if(user != null) {
//			List<UserDeviceToken> userDeviceTokens = userDeviceTokenRepository.findByPublicuser(user);
//			if(!CollectionUtils.isEmpty(userDeviceTokens)) {
//				userDeviceToken = userDeviceTokens.get(0);
//				if(userDeviceTokens.size() > 1) {
//					for(int i=1; i < userDeviceTokens.size(); i++) {
//						userDeviceTokenRepository.delete(userDeviceTokens.get(i));
//					}
//				}
//			}
//		} 
//		
//		if(userDeviceToken == null) {
//			userDeviceToken = userDeviceTokenRepository.findByDeviceToken(deviceToken);
//		}
//		
//		if(userDeviceToken == null) {
//			userDeviceToken = new UserDeviceToken();
//		}
//		
//		if(user != null) {
//			userDeviceToken.setPublicuser(user);
//		}
//		userDeviceToken.setDeviceToken(deviceToken);
//		userDeviceToken.setLang(lang);
//		userDeviceTokenRepository.save(userDeviceToken);
//	}
//
//}