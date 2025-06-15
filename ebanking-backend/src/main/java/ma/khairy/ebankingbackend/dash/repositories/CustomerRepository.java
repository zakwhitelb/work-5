package ma.khairy.ebankingbackend.dash.repositories;

import com.ebanking.backend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query("SELECT COUNT(c) FROM Customer c WHERE YEAR(c.createdAt) = :year AND MONTH(c.createdAt) = :month")
    Long countByMonth(@Param("year") int year, @Param("month") int month);

    default Long countByMonth(LocalDate date) {
        return countByMonth(date.getYear(), date.getMonthValue());
    }
} 