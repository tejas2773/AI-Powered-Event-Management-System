package com.tejas.eventbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tejas.eventbooking.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    java.util.List<Event> findByOrganizerId(Long organizerId);

}