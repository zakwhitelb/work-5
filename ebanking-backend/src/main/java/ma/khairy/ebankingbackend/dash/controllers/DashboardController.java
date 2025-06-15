package ma.khairy.ebankingbackend.dash.controllers;

import ma.khairy.ebankingbackend.dash.dtos.DashboardStatsDTO;
import ma.khairy.ebankingbackend.dash.services.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getGeneralStats() {
        return dashboardService.getGeneralStats();
    }

    @GetMapping("/account-types")
    public Map<String, Object> getAccountTypeDistribution() {
        return dashboardService.getAccountTypeDistribution();
    }

    @GetMapping("/transaction-trend")
    public Map<String, Object> getTransactionTrend() {
        return dashboardService.getTransactionTrend();
    }

    @GetMapping("/customer-growth")
    public Map<String, Object> getCustomerGrowth() {
        return dashboardService.getCustomerGrowth();
    }
} 