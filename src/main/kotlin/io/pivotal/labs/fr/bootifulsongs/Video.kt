package io.pivotal.labs.fr.bootifulsongs

import com.fasterxml.jackson.annotation.JsonInclude
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
data class Video(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int,
        val url: String,
        var providerId: String = ""
) {
}
