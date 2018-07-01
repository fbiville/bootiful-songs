package io.pivotal.labs.fr.bootifulsongs

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verify
import org.springframework.http.HttpStatus
import java.util.Optional

class VideoLikeControllerTest {

    val likes = Mockito.mock(VideoLikeRepository::class.java)
    val videos = Mockito.mock(VideoRepository::class.java)
    val controller = VideoLikeController(likes, videos)

    @Test
    fun `posts a like`() {
        val providerId = "B_VJe5iHrJw"
        val video = Video(url = "https://www.youtube.com/watch?v=$providerId", providerId = providerId)
        `when`(videos.findOneByUrlEndsWith(providerId)).thenReturn(Optional.of(video))

        val result = controller.likeVideo(providerId)

        assertThat(result.statusCode).isEqualTo(HttpStatus.OK)
        verify(likes).save(VideoLike(video = video))
    }
}
