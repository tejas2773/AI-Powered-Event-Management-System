package com.tejas.eventbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tejas.eventbooking.entity.WaitingList;

@Repository
public interface WaitingListRepository extends JpaRepository<WaitingList, Long> {

    List<WaitingList> findByUserId(Long userId);
    
    List<WaitingList> findByEventIdAndStatusOrderByJoinedAtAsc(Long eventId, String status);

}