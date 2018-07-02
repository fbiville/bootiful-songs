package io.pivotal.labs.fr.bootifulsongs

import org.springframework.jdbc.core.JdbcTemplate

fun JdbcTemplate.initVideoPayload(vararg urls: String) {
    this.initVideoPayload(urls.toList())
}

fun JdbcTemplate.initVideoPayload(urls: List<String>) {
    fun toSql(urls: List<String>): String {
        val values = urls.map { "('$it')" }.reduce { acc, s -> "$acc, $s" }
        return "INSERT INTO Video(url) VALUES $values"
    }

    this.execute(toSql(urls))
}