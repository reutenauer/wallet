require 'sinatra'

def dump(filename)
  file = File.open(filename)
  filecontents = file.read(file.size)
  file.close

  filecontents
end

class MyStream
  def initialize(filename)
    file = File.open(filename)
    @filecontents = file.read(file.size)
    file.close
  end

  def each
    yield(@filecontents)
  end
end

routes = {
  :html => { :path => '/rfc2616.html', :file => 'rfc2616.html', :type => "text/html; charset=UTF-8" },
  :css => { :path => '/style.css', :file => 'style.css', :type => "text/css" },
  :javascript => { :path => '/script.js', :file => 'script.js', :type => "text/javascript" },

  :root => :html
}

# Paths for “roots”.  Look at that name, ha ha, I’m being funny!
roots = ['/', '/index.html']

routes.each do |key, route|
  next if key == :root

  path = route[:path]
  file = route[:file]
  content_type = route[:type]

  get(path) do
    [200, { "Content-Type" => content_type }, MyStream.new(File.join('static', file))]
  end
end

roots.each do |root|
  get(root) do
    dump(File.join('static', routes[routes[:root]][:file]))
  end
end

get('*') do
  404
end

post('*') do
  404
end

put('*') do
  404
end

delete('*') do
  404
end
