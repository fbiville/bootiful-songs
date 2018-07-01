package io.pivotal.labs.fr.bootifulsongs

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.ResultSetExtractor
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.transaction.annotation.Transactional

@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class VideoLikeControllerIntegrationTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var jdbc: JdbcTemplate


    @Test
    fun `persists likes`() {
        val url = "https://www.youtube.com/watch?v=B_VJe5iHrJw"
        jdbc.initVideoPayload(url)

        this.mockMvc.perform(put("/api/likes/B_VJe5iHrJw")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk)

        val result = jdbc.queryForObject(
                "SELECT COUNT(l.*) AS `count` FROM video_like l INNER JOIN video v ON v.id = l.video_id WHERE v.url = ?",
                Int::class.java,
                url)
        assertThat(result).isEqualTo(1L)
    }

    @Test
    fun `finds likes by video provider id`() {
        this.mockMvc.perform(get("/api/likes/B_VJe5iHrJw")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.count").value(0))
    }
}
