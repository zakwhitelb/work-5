package ma.khairy.ebankingbackend.dash.repositories;

import com.ebanking.backend.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, String> {
    @Query("SELECT COUNT(a) FROM Account a WHERE a.type = :type")
    Long countByType(@Param("type") String type);

    @Query("SELECT COALESCE(SUM(a.balance), 0) FROM Account a")
    Double sumBalance();
} 