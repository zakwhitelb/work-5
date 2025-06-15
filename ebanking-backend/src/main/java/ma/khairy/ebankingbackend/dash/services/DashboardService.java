package ma.khairy.ebankingbackend.dash.services;

import ma.khairy.ebankingbackend.dash.dtos.DashboardStatsDTO;
import ma.khairy.ebankingbackend.dash.repositories.AccountRepository;
import ma.khairy.ebankingbackend.dash.repositories.CustomerRepository;
import ma.khairy.ebankingbackend.dash.repositories.OperationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final OperationRepository operationRepository;

    public DashboardService(CustomerRepository customerRepository,
                          AccountRepository accountRepository,
                          OperationRepository operationRepository) {
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
        this.operationRepository = operationRepository;
    }

    public DashboardStatsDTO getGeneralStats() {
        return new DashboardStatsDTO(
            customerRepository.count(),
            accountRepository.count(),
            accountRepository.sumBalance(),
            operationRepository.count()
        );
    }

    public Map<String, Object> getAccountTypeDistribution() {
        Map<String, Object> result = new HashMap<>();
        List<String> labels = Arrays.asList("Current Account", "Saving Account");
        List<Long> data = Arrays.asList(
            accountRepository.countByType("CURRENT"),
            accountRepository.countByType("SAVING")
        );
        result.put("labels", labels);
        result.put("data", data);
        return result;
    }

    public Map<String, Object> getTransactionTrend() {
        Map<String, Object> result = new HashMap<>();
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(6);
        
        List<String> labels = Arrays.asList(
            startDate.plusMonths(1).toString(),
            startDate.plusMonths(2).toString(),
            startDate.plusMonths(3).toString(),
            startDate.plusMonths(4).toString(),
            startDate.plusMonths(5).toString(),
            endDate.toString()
        );
        
        List<Long> data = Arrays.asList(
            operationRepository.countByMonth(startDate.plusMonths(1)),
            operationRepository.countByMonth(startDate.plusMonths(2)),
            operationRepository.countByMonth(startDate.plusMonths(3)),
            operationRepository.countByMonth(startDate.plusMonths(4)),
            operationRepository.countByMonth(startDate.plusMonths(5)),
            operationRepository.countByMonth(endDate)
        );
        
        result.put("labels", labels);
        result.put("data", data);
        return result;
    }

    public Map<String, Object> getCustomerGrowth() {
        Map<String, Object> result = new HashMap<>();
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(6);
        
        List<String> labels = Arrays.asList(
            startDate.plusMonths(1).toString(),
            startDate.plusMonths(2).toString(),
            startDate.plusMonths(3).toString(),
            startDate.plusMonths(4).toString(),
            startDate.plusMonths(5).toString(),
            endDate.toString()
        );
        
        List<Long> data = Arrays.asList(
            customerRepository.countByMonth(startDate.plusMonths(1)),
            customerRepository.countByMonth(startDate.plusMonths(2)),
            customerRepository.countByMonth(startDate.plusMonths(3)),
            customerRepository.countByMonth(startDate.plusMonths(4)),
            customerRepository.countByMonth(startDate.plusMonths(5)),
            customerRepository.countByMonth(endDate)
        );
        
        result.put("labels", labels);
        result.put("data", data);
        return result;
    }
} 