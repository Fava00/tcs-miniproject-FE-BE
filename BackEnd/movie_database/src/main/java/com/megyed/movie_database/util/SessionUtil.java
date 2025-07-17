package com.megyed.movie_database.util;

import jakarta.servlet.http.HttpSession;

public final class SessionUtil {
    private SessionUtil(){}

    public static String getCurrentUsername(HttpSession session){
        Object obj = session.getAttribute("currentUser");
        return obj instanceof String ? (String) obj : null;
    }

    public static String getCurrentRole(HttpSession session) {
        Object obj = session.getAttribute("currentRole");
        return obj instanceof String ? (String) obj : null;
    }

    public static boolean hasRole(HttpSession session, String... roles) {
        String current = getCurrentRole(session);
        if (current == null) return false;
        for (String allowed : roles) {
            if (current.equalsIgnoreCase(allowed)) return true;
        }
        return false;
    }
}
