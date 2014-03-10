require 'rubygems'
require 'bundler/setup'
require 'rspec/expectations'
require 'cucumber'
require 'capybara/cucumber'

Capybara.app = Rack::Builder.new do
  map "/" do
    use Rack::Static, :urls => ["/"], :root => 'output/index.html'
    run lambda {|env| [404, {}, '']}
  end
end.to_app
