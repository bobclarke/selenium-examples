Feature: Google search

  @Demo
  Scenario Outline: I search for a keyword on google

    Given As a colleague I navigate to URL "<Google>" page
    When I enter the "<search_text>" in "search" input field
    And I click on "Google Search button"
    Then I should see the text of "searchResult" as "Selenium"

    Examples:
      | Google | search_text |
      | Google | Selenium    |


