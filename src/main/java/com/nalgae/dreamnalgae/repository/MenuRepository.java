package com.nalgae.dreamnalgae.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nalgae.dreamnalgae.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findAllByUseYn(String useYn);

    List<Menu> findByParentMenuId(String parentMenuId);

    List<Menu> findByMenuLevel(Integer menuLevel);

    Menu findByMenuId(String menuId);
}
