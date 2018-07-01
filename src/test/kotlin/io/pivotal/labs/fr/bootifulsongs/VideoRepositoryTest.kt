package io.pivotal.labs.fr.bootifulsongs

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@DataJpaTest
class VideoRepositoryTest {

    @Autowired
    lateinit var repository: VideoRepository

    @Autowired
    lateinit var jdbc: JdbcTemplate

    @Test
    fun `picks a video at random`() {
        val videos = listOf(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "https://www.youtube.com/watch?v=btPJPFnesV4",
                "https://www.youtube.com/watch?v=k21nZsf6kHM")
        jdbc.initVideoPayload(videos)

        val video = repository.findOneAtRandom().get()

        assertThat(videos).contains(video.url)
    }
}
