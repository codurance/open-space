package com.codurance.open_space;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenSpaceSessionRepository extends JpaRepository<OpenSpaceSession, Integer> {
}