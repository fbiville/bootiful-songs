package io.pivotal.labs.fr.bootifulsongs.integration

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
class VideosIntegrationTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var jdbc: JdbcTemplate

    @Test
    fun `finds all videos`() {
        this.mockMvc.perform(get("/videos"))
                .andExpect(status().isOk)
    }

    @Test
    fun `registers a new video`() {
        val videoUri = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

        this.mockMvc.perform(post("/videos")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content("{\"url\": \"$videoUri\"}"))
                .andExpect(status().isCreated)

        val result = jdbc.queryForObject("SELECT COUNT(*) FROM video WHERE url = ?", arrayOf(videoUri), Int::class.java)
        assertThat(result)
                .describedAs("Expected row count of videos with URL $videoUri")
                .isEqualTo(1)
    }
}