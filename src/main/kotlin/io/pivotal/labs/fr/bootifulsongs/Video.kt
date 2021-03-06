package io.pivotal.labs.fr.bootifulsongs

import com.fasterxml.jackson.annotation.JsonInclude
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "video")
data class Video(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int = -1,
        val url: String,
        var providerId: String = ""
)
