package com.nalgae.dreamnalgae.repository;

import com.nalgae.dreamnalgae.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

}
