package com.nalgae.dreamnalgae.controller.wbas;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nalgae.dreamnalgae.service.wbas.Wbas2001Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wbas")
public class Wbas2001Controller {
    private final Wbas2001Service wbas2001Service;

    @GetMapping("/init")
    public List<Map<String, Object>> getInitData(){
        List<Map<String,Object>> rows = wbas2001Service.getInitData();

        System.out.println("getInitData rows = " + rows);

        return rows;
    }

    @PostMapping("/upload-excel")
    public ResponseEntity<String> uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            wbas2001Service.processExcelFile(file);
            return ResponseEntity.ok("업로드 및 등록 완료");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류: "+e.getMessage());
        }
    }
    
    
}
