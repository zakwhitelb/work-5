package ma.khairy.ebankingbackend.dash.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalCustomers;
    private long totalAccounts;
    private double totalBalance;
    private long totalTransactions;
} 