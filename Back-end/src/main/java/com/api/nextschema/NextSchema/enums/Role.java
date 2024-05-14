package com.api.nextschema.NextSchema.enums;

public enum Role {
    ROLE_ADMIN("role_admin"),
    ROLE_LZ("role_lz"),
    ROLE_BRONZE("role_bronze"),
    ROLE_SILVER("role_silver");

    private String role;
    Role(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }
}
