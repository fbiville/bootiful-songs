package io.pivotal.labs.fr.bootifulsongs

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.springframework.hateoas.Resource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.*

class VideoControllerTest {
    val repository = mock(VideosRepository::class.java)
    val controller = VideoController(repository)

    @Test
    fun `exposes random video`() {
        val video = Video(id = 42, url = "https://www.youtube.com/watch?v=xYc4DT18EJg")
        `when`(repository.findOneAtRandom()).thenReturn(Optional.of(video))

        val result: ResponseEntity<Resource<Video>> = controller.findRandom()

        assertThat(result.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(result.body!!.content).isEqualTo(video)
    }

    @Test
    fun `returns no content is no video found`() {
        `when`(repository.findOneAtRandom()).thenReturn(Optional.empty())

        val result: ResponseEntity<Resource<Video>> = controller.findRandom()

        assertThat(result.statusCode).isEqualTo(HttpStatus.NO_CONTENT)
    }
}
