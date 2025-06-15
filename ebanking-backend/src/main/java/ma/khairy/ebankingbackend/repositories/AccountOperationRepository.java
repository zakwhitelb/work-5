package ma.khairy.ebankingbackend.repositories;

import ma.khairy.ebankingbackend.entities.AccountOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AccountOperationRepository extends JpaRepository<AccountOperation, Long> {
    List<AccountOperation> findByBankAccountId(String accountId);
    Page<AccountOperation> findByBankAccountId(String accountId, Pageable pageable);

    @Query("SELECT COUNT(o) FROM AccountOperation o")
    long count();

    @Query("SELECT COUNT(o) FROM AccountOperation o WHERE FUNCTION('MONTH', o.operationDate) = FUNCTION('MONTH', :date) AND FUNCTION('YEAR', o.operationDate) = FUNCTION('YEAR', :date)")
    long countByMonth(LocalDateTime date);
}
