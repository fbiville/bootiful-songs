package io.pivotal.labs.fr.bootifulsongs

import org.springframework.hateoas.Resource
import org.springframework.hateoas.ResourceProcessor
import org.springframework.stereotype.Component
import java.util.regex.Pattern

@Component
class VideoResourceProcessor: ResourceProcessor<Resource<Video>> {

    override fun process(resource: Resource<Video>): Resource<Video> {
        val content = resource.content
        content.providerId = extract(content.url)
        return resource
    }

    private fun extract(url: String): String {
        val matcher = Pattern.compile(youtubeVideoRegex).matcher(url)
        matcher.matches() //  don't do this at home
        return matcher.group(1)
    }

    companion object {
        const val youtubeVideoRegex = "^(?:(?:https?)://)?(?:www.)?youtube.com/watch?(?:.*)v=([A-Za-z0-9._%-]{11}).*"
    }
}
