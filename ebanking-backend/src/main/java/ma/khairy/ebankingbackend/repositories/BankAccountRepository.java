package ma.khairy.ebankingbackend.repositories;

import ma.khairy.ebankingbackend.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    @Query("SELECT COUNT(a) FROM BankAccount a")
    long count();

    @Query("SELECT COUNT(a) FROM BankAccount a WHERE TYPE(a) = :type")
    long countByType(String type);

    @Query("SELECT COALESCE(SUM(a.balance), 0) FROM BankAccount a")
    double sumBalance();
}
