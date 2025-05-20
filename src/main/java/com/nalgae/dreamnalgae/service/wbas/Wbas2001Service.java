package com.nalgae.dreamnalgae.service.wbas;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nalgae.dreamnalgae.repository.wbas.Wbas2001Repository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Wbas2001Service {
    private final Wbas2001Repository wbas2001Repository;
    private final NamedParameterJdbcTemplate jdbc;

    public List<Map<String,Object>> getInitData() {
        StringBuilder sql = new StringBuilder();
        sql.append("""
            select
                group_cd,
                code_cd,
                code_nm
            from tms_code_m
            where group_cd = '000'
        """);

        Map<String, Object> params = new HashMap<>();

        return jdbc.queryForList(sql.toString(), params);

    }

    @Transactional
    public void processExcelFile(MultipartFile file) throws IOException {
        //List<Book> books = new ArrayList<>();

      




    }







    
}
