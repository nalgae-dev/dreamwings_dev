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
import org.springframework.stereotype.Service;

import com.nalgae.dreamnalgae.entity.obas.RepairId;
import com.nalgae.dreamnalgae.entity.obas.TmsCar;
import com.nalgae.dreamnalgae.entity.obas.TmsRepair;
import com.nalgae.dreamnalgae.model.Book;
import com.nalgae.dreamnalgae.model.obas.CarListDto;
import com.nalgae.dreamnalgae.model.obas.OilMonthData;
import com.nalgae.dreamnalgae.model.obas.OilupdateRequest;
import com.nalgae.dreamnalgae.repository.obas.Oman4001Repository;
import com.nalgae.dreamnalgae.repository.obas.TmsCarRepository;
import com.nalgae.dreamnalgae.repository.obas.TmsRepairRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Obas4001Service {
    private final Oman4001Repository oman4001Repository;
    private final TmsCarRepository tmsCarRepository;
    private final TmsRepairRepository tmsRepairRepository;
    private final JdbcTemplate jdbcTemplate;

    public List<CarListDto> getCarRepairLatestDriver ()  {
        return oman4001Repository.getCarRepairLatestDriver();

    }

    public void updateOil(OilupdateRequest request) {
        String sql = "MERGE INTO TMS_OIL USING DUAL ON (CENTER_CD=? AND OIL_YEAR=? AND CAR_CD=?) " +
                     "WHEN MATCHED THEN UPDATE SET " +
                     IntStream.rangeClosed(1, 12)
                              .mapToObj(i -> String.format("OIL_LITTER%d=?, OIL_MONEY%d=?", i, i))
                              .collect(Collectors.joining(", ")) +
                     " WHEN NOT MATCHED THEN INSERT (CENTER_CD, CAR_CD, OIL_YEAR, " +
                     IntStream.rangeClosed(1, 12).mapToObj(i -> "OIL_LITTER"+i+", OIL_MONEY"+i).collect(Collectors.joining(", ")) +
                     ") VALUES (" +
                     "?, ?, ?, " + IntStream.rangeClosed(1, 12).mapToObj(i -> "?, ?").collect(Collectors.joining(", ")) + ")";
    
        List<Object> params = new ArrayList<>();
        params.add(request.getCenterCd());
        params.add(request.getOilYear());
        params.add(request.getCarCd());
    
        List<OilMonthData> oilData = request.getOilData(); // 무조건 null 아님
        for (int i = 0; i < 12; i++) {
            OilMonthData data = oilData.size() > i ? oilData.get(i) : new OilMonthData();
            params.add(data.getLitter());
            params.add(data.getMoney());
        }
    
        params.add(request.getCenterCd());
        params.add(request.getCarCd());
        params.add(request.getOilYear());
        for (int i = 0; i < 12; i++) {
            OilMonthData data = oilData.size() > i ? oilData.get(i) : new OilMonthData();
            params.add(data.getLitter());
            params.add(data.getMoney());
        }
    
        jdbcTemplate.update(sql, params.toArray());
    }
    

    public List<OilMonthData> getOil(String centerCd, String carCd, String year) {
        String sql = "SELECT * FROM TMS_OIL WHERE CENTER_CD=? AND CAR_CD=? AND OIL_YEAR=?";

        return jdbcTemplate.query(sql, new Object[]{centerCd, carCd, year}, rs -> {
            List<OilMonthData> result = new ArrayList<>();
            for (int i = 1; i <= 12; i++) {
                OilMonthData data = new OilMonthData();
                data.setMonth(i);
                data.setLitter(rs.getInt("OIL_LITTER" + i));
                data.setMoney(rs.getInt("OIL_MONEY" + i));
                result.add(data);
            }
            return result;
        });
    }

    public TmsCar getCarInfo(String carCd) {
        return tmsCarRepository.findFirstByIdCarCd(carCd);
    }

    public TmsRepair getRepairData(String carCd) {
        return tmsRepairRepository.findFirstByIdCarCd(carCd);
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
    
}
