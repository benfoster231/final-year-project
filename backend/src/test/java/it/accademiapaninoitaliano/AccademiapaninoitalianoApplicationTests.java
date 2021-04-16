package it.accademiapaninoitaliano;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.exercise.database.entities.Gym;
import com.exercise.database.entities.Gym;
import com.exercise.database.entities.Store;
import com.exercise.database.entities.StorePhotoDTO;
import com.exercise.repository.ConcreteStorePhotoRepository;
import com.exercise.repository.ConcreteStoresRepository;
import com.exercise.repository.StorePhotoRepository;
import com.exercise.repository.StoresRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AccademiapaninoitalianoApplicationTests {

	@Autowired
	private ConcreteStoresRepository concreteStoresRepository;
	
	@Autowired
	private StoresRepository storesRepository;
	
	@Autowired
	private ConcreteStorePhotoRepository concreteStorePhotoRepository;
	
	@Autowired
	private StorePhotoRepository storePhotoRepository;
	
	@Test
	public void contextLoads() {
		this.setStoreDataToConcreteStore();
	}
	
	private void setStoreDataToConcreteStore() {
		List<Gym> concreteStores = concreteStoresRepository.findAll();
		
		try {
			for(Gym concreteStore :concreteStores ) {
				if(concreteStore.getStoreId() != null) {
					
					Optional<Store> optional = storesRepository.findById(concreteStore.getStoreId());
					
					if(optional.isPresent()) {
						Store store = optional.get();
						concreteStore.setAccessUserId(store.getAccessUserId());
						concreteStore.setDescription(store.getDescription());
						concreteStore.setDescriptionEn(store.getDescriptionEn());
//						concreteStore.setEnableDescription(store.getEnableDescription()) ;
//						concreteStore.setEnableEspressi(store.getEnableEspressi()) ;
//						concreteStore.setEnableWebsite(store.getEnableWebsite()) ;
						concreteStore.setFlgSponsorLavazza(store.getFlgSponsorLavazza()) ;
						concreteStore.setLkCodeStoretype(store.getLkCodeStoretype()) ;
						concreteStore.setLkListStoretype(store.getLkListStoretype());
						concreteStore.setWebsite(store.getWebsite());
						ConcreteStorePhoto concreteStorePhoto = concreteStorePhotoRepository.findByConcreteStoreId(concreteStore.getId());
						
						if(concreteStorePhoto == null || StringUtils.isEmpty(concreteStorePhoto.getPictureFilename())) {
							
							 if(concreteStorePhoto == null) {
								 concreteStorePhoto = new ConcreteStorePhoto();
							 }
							 
							 List<StorePhotoDTO> storePhotoDTOs = storePhotoRepository.findByStoreId(store.getId());
							
							 if(! CollectionUtils.isEmpty(storePhotoDTOs)) {
								
								 if(!StringUtils.isEmpty(storePhotoDTOs.get(0).getPictureFilename())){
									 concreteStorePhoto.setConcreteStoreId(concreteStore.getId());
									 concreteStorePhoto.setPictureFilename(storePhotoDTOs.get(0).getPictureFilename());
									try {
										 concreteStorePhotoRepository.save(concreteStorePhoto);
									} catch (Exception e) {
										e.printStackTrace();
									}
								 }
							 }
						
						}
						
						try {
							concreteStoresRepository.save(concreteStore);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
