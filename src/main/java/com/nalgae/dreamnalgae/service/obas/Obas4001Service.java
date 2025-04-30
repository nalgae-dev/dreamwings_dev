package com.nalgae.dreamnalgae.service.obas;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Service;

import com.nalgae.dreamnalgae.entity.obas.RepairId;
import com.nalgae.dreamnalgae.entity.obas.TmsCar;
import com.nalgae.dreamnalgae.entity.obas.TmsCarsago;
import com.nalgae.dreamnalgae.entity.obas.TmsCarsagoId;
import com.nalgae.dreamnalgae.entity.obas.TmsOil;
import com.nalgae.dreamnalgae.entity.obas.TmsOilId;
import com.nalgae.dreamnalgae.entity.obas.TmsRepair;
import com.nalgae.dreamnalgae.entity.obas.TmsTax;
import com.nalgae.dreamnalgae.entity.obas.TmsTaxId;
import com.nalgae.dreamnalgae.model.Book;
import com.nalgae.dreamnalgae.model.obas.CarListDto;
import com.nalgae.dreamnalgae.model.obas.OilMonthData;
import com.nalgae.dreamnalgae.model.obas.OilSaveRequest;
import com.nalgae.dreamnalgae.model.obas.OilupdateRequest;
import com.nalgae.dreamnalgae.repository.obas.Oman4001Repository;
import com.nalgae.dreamnalgae.repository.obas.TmsCarRepository;
import com.nalgae.dreamnalgae.repository.obas.TmsCarsagoRepository;
import com.nalgae.dreamnalgae.repository.obas.TmsOilRepository;
import com.nalgae.dreamnalgae.repository.obas.TmsRepairRepository;
import com.nalgae.dreamnalgae.repository.obas.TmsTaxRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Obas4001Service {
    private final Oman4001Repository oman4001Repository;
    private final TmsCarRepository tmsCarRepository;
    private final TmsRepairRepository tmsRepairRepository;
    private final TmsOilRepository tmsOilRepository;
    private final TmsTaxRepository tmsTaxRepository;
    private final TmsCarsagoRepository tmsCarsagoRepository;
    private final JdbcTemplate jdbcTemplate;

    public List<CarListDto> getCarRepairLatestDriver ()  {
        return oman4001Repository.getCarRepairLatestDriver();

    }

    public TmsCar getCarInfo(String carCd) {
        return tmsCarRepository.findFirstByIdCarCd(carCd);
    }

    public TmsRepair getRepairData(String carCd) {
        return tmsRepairRepository.findFirstByIdCarCd(carCd);
    }

    public TmsOil getOilInfo(String carCd) {
        return tmsOilRepository.findFirstByIdCarCd(carCd);
    }

    public TmsTax getTaxInfo(String carCd) {
        return tmsTaxRepository.findFirstByIdCarCd(carCd);
    }

    public void updateRepair(TmsRepair repair) {
        RepairId id = repair.getId();
        if (id == null || id.getCenterCd() == null || id.getCarCd() == null || id.getRepairYear() == null) {
            throw new IllegalArgumentException("ID 정보(centerCd, carCd, repairYear)가 누락되었습니다.");
        }

        boolean exists = tmsRepairRepository.existsById(id);

        if (exists) {
            // 업데이트
            TmsRepair existing = tmsRepairRepository.findById(id).orElseThrow(() -> new IllegalStateException("수정할 데이터가 없습니다."));

            BeanUtils.copyProperties(repair, existing, "id", "insertDt", "insertId"); 
            existing.setUpdateDt(new Date());
            existing.setUpdateId("admin"); // 로그인 사용자의 ID로 대체 가능

            tmsRepairRepository.save(existing);
        } else {
            // 신규 인서트
            repair.setInsertDt(new Date());
            repair.setInsertId("admin");  // 로그인 사용자의 ID로 대체 가능
            tmsRepairRepository.save(repair);
        }

        tmsRepairRepository.save(repair);
    }

    // 주유내역 저장
    @Transactional
    public void oilSave(TmsOil oil) {
        TmsOilId id = oil.getId();
        if (id == null || id.getCenterCd() == null || id.getCarCd() == null || id.getOilYear() == null) {
            throw new IllegalArgumentException("ID 정보(centerCd, carCd, oilYear)가 누락되었습니다.");
        }

        boolean exists = tmsOilRepository.existsById(id);

        if (exists) {
            // 업데이트
            TmsOil existing = tmsOilRepository.findById(id)
                    .orElseThrow(() -> new IllegalStateException("수정할 데이터가 없습니다."));

            // id, insertDt, insertId는 복사 제외
            BeanUtils.copyProperties(oil, existing, "id", "insertDt", "insertId");

            existing.setUpdateDt(new Date());
            existing.setUpdateId("admin"); // 로그인 사용자 ID로 교체 가능
            tmsOilRepository.save(existing);
        } else {
            // 신규 입력
            oil.setInsertDt(new Date());
            oil.setInsertId("admin"); // 로그인 사용자 ID로 교체 가능
            tmsOilRepository.save(oil);
        }
    }

    // 차량 세금 내역 저장
    @Transactional
    public void saveTax(TmsTax tax) {
        TmsTaxId id = tax.getId();
        if (id == null || id.getCenterCd() == null || id.getCarCd() == null || id.getTaxYear() == null) {
            throw new IllegalArgumentException("ID 정보(centerCd, carCd, taxYear)가 누락되었습니다.");
        }

        boolean exists = tmsTaxRepository.existsById(id);

        if (exists) {
            TmsTax existing = tmsTaxRepository.findById(id)
                    .orElseThrow(() -> new IllegalStateException("수정할 세금 데이터가 없습니다."));

            BeanUtils.copyProperties(tax, existing, "id", "insertDt", "insertId");
            existing.setUpdateDt(new Date());
            existing.setUpdateId("admin");

            tmsTaxRepository.save(existing);
        } else {
            tax.setInsertDt(new Date());
            tax.setInsertId("admin");
            tmsTaxRepository.save(tax);
        }

    }


    // 차량 사고현황 저장
    @Transactional
    public void saveAccident(TmsCarsago accident) {
        TmsCarsagoId id = accident.getId();
        if (id == null || id.getCenterCd() == null || id.getCarCd() == null || id.getCarsagoYear() == null) {
            throw new IllegalArgumentException("ID 정보(centerCd, carCd, carsagoYear)가 누락되었습니다.");
        }

        boolean exists = tmsCarsagoRepository.existsById(id);

        if (exists) {
            TmsCarsago existing = tmsCarsagoRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("수정할 데이터가 없습니다."));

            BeanUtils.copyProperties(accident, existing, "id", "insertDt", "insertId");

            existing.setUpdateDt(new Date());
            existing.setUpdateId("admin"); // 로그인 사용자 ID로 교체 가능
            tmsCarsagoRepository.save(existing);
        } else {
            accident.setInsertDt(new Date());
            accident.setInsertId("admin"); // 로그인 사용자 ID로 교체 가능
            tmsCarsagoRepository.save(accident);
        }
    }

    // 차량 사고현황 조회
    public TmsCarsago getAccidentData(String carCd) {
        return tmsCarsagoRepository.findFirstByIdCarCd(carCd);
    }
    
}
