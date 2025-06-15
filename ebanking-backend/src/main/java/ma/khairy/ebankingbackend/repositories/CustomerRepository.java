package ma.khairy.ebankingbackend.repositories;

import ma.khairy.ebankingbackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByNameContaining(String keyword);
    @Query("SELECT COUNT(c) FROM Customer c")
    long count();
}
