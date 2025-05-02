package com.nalgae.dreamnalgae.controller.obas;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nalgae.dreamnalgae.entity.obas.TmsCarsago;
import com.nalgae.dreamnalgae.entity.obas.TmsOil;
import com.nalgae.dreamnalgae.entity.obas.TmsRepair;
import com.nalgae.dreamnalgae.entity.obas.TmsSell;
import com.nalgae.dreamnalgae.entity.obas.TmsTax;
import com.nalgae.dreamnalgae.model.obas.CarListDto;
import com.nalgae.dreamnalgae.service.obas.Obas4001Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/obas")
public class Obas4001Controller {
    private final Obas4001Service obas4001Service;

    @GetMapping("/carlist")
    public List<CarListDto> getCarRepairList() {
        return obas4001Service.getCarRepairLatestDriver();
    }

    //차량 기본정보 불러오기
    @GetMapping("/car/detail")
    public Map<String,Object> getCarDetail(@RequestParam String carCd) {
        Map<String, Object> result = new HashMap<>();
        result.put("carInfo", obas4001Service.getCarInfo(carCd)); 
        result.put("oilData", obas4001Service.getOilInfo(carCd));
        result.put("repairData", obas4001Service.getRepairData(carCd));
        result.put("taxData", obas4001Service.getTaxInfo(carCd));
        result.put("accidentData", obas4001Service.getAccidentData(carCd));
        result.put("sellData", obas4001Service.getSellData(carCd));
       
        return result;
    }

    // 주유내역 업데이트
    @PostMapping("/oil/save")
    public ResponseEntity<?> saveOil(@RequestBody TmsOil oil) {
        try {
            obas4001Service.oilSave(oil);
            return ResponseEntity.ok("주유내역이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주유내역 저장 실패: " + e.getMessage());
        }
    }

    // @GetMapping("/oil/info")
    // public ResponseEntity<?> getOilInfo(@RequestParam String centerCd,@RequestParam String carCd,@RequestParam String year) {
    //     return ResponseEntity.ok(obas4001Service.getOil(centerCd,carCd,year));
    // }

    // 수리내역 업데이트
    @PostMapping("/repair/update")
    public ResponseEntity<?> updateRepair(@RequestBody TmsRepair repair) {
        try {
            obas4001Service.updateRepair(repair);
            return ResponseEntity.ok("수리내역이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수리내역 저장 실패: " + e.getMessage());
        }
    }

    // 차량 세금 저장
    @PostMapping("/tax/save")
    public ResponseEntity<?> saveTax(@RequestBody TmsTax tax) {
        try {
            obas4001Service.saveTax(tax);
            return ResponseEntity.ok("세금내역이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("세금내역 저장 실패: " + e.getMessage());
        }
    }

    // 사고현황 저장
    @PostMapping("/accident/save")
    public ResponseEntity<?> saveAccident(@RequestBody TmsCarsago accident) {
        try {
            obas4001Service.saveAccident(accident);
            return ResponseEntity.ok("사고내역이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사고내역 저장 실패: " + e.getMessage()); 
        }
    }

    // 차량 매각/폐차 내역 저장
    @PostMapping("/sell/save")
    public ResponseEntity<?> saveSell(@RequestBody TmsSell sell) {
        try {
            obas4001Service.saveSell(sell);
            return ResponseEntity.ok("사고내역이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사고내역 저장 실패: " + e.getMessage()); 
        }
    }


}
