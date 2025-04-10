package com.nalgae.dreamnalgae.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nalgae.dreamnalgae.entity.Menu;
import com.nalgae.dreamnalgae.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {
    private final MenuRepository menuRepository;

    public List<Menu> getMenuTree() {
        List<Menu> allMenus = menuRepository.findAll();
        Map<String, Menu> menuMap = new HashMap<>();
        List<Menu> roots = new ArrayList<>();

        for (Menu menu : allMenus) {
            menuMap.put(menu.getMenuId(), menu);
            menu.setChildren(new ArrayList<>());
        }

        for (Menu menu : allMenus) {
            if (menu.getParentMenuId() == null || menu.getParentMenuId().isEmpty()) {
                roots.add(menu);
            } else {
                Menu parent = menuMap.get(menu.getParentMenuId());
                if (parent != null) {
                    parent.getChildren().add(menu);
                } else {
                    roots.add(menu);
                }
            }
        }

        return roots;
    }

    public List<Menu> getAllMenus() {
        return menuRepository.findAllByUseYn("1");
    }

    public List<Menu> getTopMenus() {
        return menuRepository.findByMenuLevel(1).stream()
                .filter(menu -> "1".equals(menu.getUseYn()))
                .collect(Collectors.toList());
    }

    public List<Menu> getSubMenus(String parentMenuId) {
        return menuRepository.findByParentMenuId(parentMenuId).stream()
                .filter(menu -> "1".equals(menu.getUseYn()))
                .collect(Collectors.toList());
    }

    public Menu getMenuByMenuId(String menuId) {
        return menuRepository.findByMenuId(menuId);
    }
}
