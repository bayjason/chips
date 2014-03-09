Feature: Homepage

  Scenario: Visit the homepage
    When I visit the homepage
    Then I should see the chip board
    And I should see the "Chips" homepage heading
    And the page title should be "Chips"
