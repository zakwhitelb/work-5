package ma.khairy.ebankingbackend.dash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface OperationRepository extends JpaRepository<Operation, Long> {
    @Query("SELECT COUNT(o) FROM Operation o WHERE YEAR(o.operationDate) = :year AND MONTH(o.operationDate) = :month")
    Long countByMonth(@Param("year") int year, @Param("month") int month);

    default Long countByMonth(LocalDate date) {
        return countByMonth(date.getYear(), date.getMonthValue());
    }
} 