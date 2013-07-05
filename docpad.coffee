# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
	# ...
    templateData:
        site:
            title: "My Website"

        getPreparedTitle: -> if @document.title then "#{@document.title} | #{@site.title}" else @site.title

    collections:
        pages: ->
            @getCollection("html").findAllLive({isPage:true}).on "add", (model) ->
                model.setMetaDefaults({layout:"default"})
        posts: ->
        	@getCollection("html").findAllLive({isPage:false})
    # ...
}

# Export the DocPad Configuration
module.exports = docpadConfig