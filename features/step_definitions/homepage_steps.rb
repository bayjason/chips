When(/^I visit the homepage$/) do
  visit '/'
end

Then(/^I should see the chip board$/) do
  page.should have_css "div#chips"
end

Then(/^I should see the "(.*?)" homepage heading$/) do |heading|
  within "h1" do
    page.should have_content heading
  end
end

Then(/^the page title should be "(.*?)"$/) do |title|
  page.should have_title title
end
