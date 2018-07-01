package io.pivotal.labs.fr.bootifulsongs

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.springframework.hateoas.Resource

class VideoResourceProcessorTest {


    @Test
    fun `adds provider id`() {
        val resource = Resource(Video(42, "https://www.youtube.com/watch?v=dQw4w9WgXcQ"))
        val processor = VideoResourceProcessor()

        val content = processor.process(resource).content

        assertThat(content.id).isEqualTo(42)
        assertThat(content.url).isEqualTo("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        assertThat(content.providerId).isEqualTo("dQw4w9WgXcQ")
    }
}
