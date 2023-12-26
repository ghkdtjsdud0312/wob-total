package com.kh.wob.service;

import com.kh.wob.dto.AdDto;
import com.kh.wob.dto.PostDto;
import com.kh.wob.dto.UserMyPageDto;
import com.kh.wob.entity.Ad;
import com.kh.wob.entity.Category;
import com.kh.wob.entity.Post;
import com.kh.wob.entity.User;
import com.kh.wob.repository.AdRepository;
import com.kh.wob.repository.CategoryRepository;
import com.kh.wob.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdService {
    private final AdRepository adRepository;
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    // 광고 목록 조회
    public List<AdDto> getAdList() {
        List<Ad> ads = adRepository.findAll();
        List<AdDto> adDtos = new ArrayList<>();
        for(Ad ad : ads) {
            adDtos.add(convertEntityToDto(ad));
        }
        return adDtos;
    }
    // 광고 페이지네이션
    public List<AdDto> getAdPageList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Ad> ads = adRepository.findAll(pageable).getContent();
        List<AdDto> adDtos = new ArrayList<>();
        for(Ad ad : ads) {
            adDtos.add(convertEntityToDto(ad));
        }
        return adDtos;
    }
    // 광고 페이지 수 조회
    public int getAds(Pageable pageable) {
        return adRepository.findAll(pageable).getTotalPages();
    }

    // 광고 목록 활성화/비활성화 선택
    public boolean updateAdActive(AdDto adDto) {
        try {
            Optional<Ad> optionalAd = adRepository.findById(adDto.getId());

            if (optionalAd.isPresent()) {
                Ad ad = optionalAd.get();
                ad.setActive(adDto.getActive());
                adRepository.save(ad);
                return true;
            } else {
                log.error("해당 유저를 찾을 수 없음 id: {}", adDto.getId());
                return false;
            }
        } catch (Exception e) {
            log.error("유저 활성화/비활성화 업데이트 중 오류 발생", e);
            return false;
        }
    }
    // 광고 검색

    // 광고 등록
    public boolean saveAd(AdDto adDto) {
        try {
            // Post 저장
            Post post = new Post();
            post.setTitle(adDto.getCategoryName());
            postRepository.save(post);

            // Category 저장
            Category category = new Category();
            category.setName(adDto.getCategoryName());
            categoryRepository.save(category);

            // Ad 저장
            Ad ad = new Ad();
            ad.setPost(post);
            ad.setImage(adDto.getImage());
            ad.setPeriod(adDto.getPeriod());
            ad.setFee(adDto.getFee());
            adRepository.save(ad);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    // 엔티티를 dto로 변환하는 메서드
    private AdDto convertEntityToDto(Ad ad) {
        AdDto adDto = new AdDto();
        adDto.setId(ad.getId());
        adDto.setFee(ad.getFee());
        adDto.setPeriod(ad.getPeriod());
        adDto.setImage(ad.getImage());
        adDto.setRegDate(ad.getRegDate());
        adDto.setActive(ad.getActive());
        return adDto;
    }
}
