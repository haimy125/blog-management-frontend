// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/login/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Đã xảy ra lỗi không xác định");
            }

            const result = await response.json();

            if (result.status === 200) {
                localStorage.setItem("token", result.data);
                localStorage.setItem("userId", result.userId);
                router.push("/");
            } else {
                setError(result.desc || "Đăng nhập thất bại");
            }
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const hanldRegister = () => {
        router.push("/register");
    };

    return (
        <div style={styles.container}>
            <div style={styles.logoContainer}>
                <Image
                    alt="Your Company Logo"
                    src="hm.svg"
                    width={48}
                    height={48}
                    unoptimized
                />
                <h2 style={styles.title}>Sign in to your account</h2>
            </div>

            <div style={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.label}>
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            style={styles.input}
                        />
                    </div>

                    {error && <p style={styles.error}>{error}</p>}

                    <div style={styles.formGroup}>
                        <button type="submit" style={styles.button}>
                            Sign in
                        </button>
                    </div>
                </form>

                <p style={styles.footer}>
                    Not a member?{" "}
                    <a onClick={hanldRegister} style={styles.link}>
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

// Styles object for inline CSS
const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column" as const, // Không cần 'as "column"'
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
    },
    logoContainer: {
        margin: "0 auto",
        maxWidth: "400px",
        textAlign: "center" as const, // Không cần 'as "center"'
    },
    title: {
        marginTop: "1.5rem",
        fontSize: "1.875rem",
        fontWeight: "bold" as const, // Không cần 'as "bold"'
        color: "#171717",
    },
    subTitle: {
        marginTop: "0.5rem",
        fontSize: "0.875rem",
        color: "#6b7280",
    },
    formContainer: {
        marginTop: "2rem",
        margin: "0 auto",
        maxWidth: "400px",
    },
    formGroup: {
        marginBottom: "1.5rem",
    },
    label: {
        display: "block",
        fontSize: "0.875rem",
        marginBottom: "0.5rem",
        color: "#171717",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        borderRadius: "0.375rem",
        border: "1px solid #d1d5db",
        fontSize: "0.875rem",
        color: "#171717",
        backgroundColor: "#ffffff",
    },
    error: {
        color: "#dc2626",
        fontSize: "0.875rem",
        textAlign: "center" as const, // Không cần 'as "center"'
        marginTop: "0.5rem",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        borderRadius: "0.375rem",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        fontSize: "1rem",
        fontWeight: "600",
        textAlign: "center" as const, // Không cần 'as "center"'
        border: "none",
        cursor: "pointer",
    },
    footer: {
        marginTop: "1.5rem",
        textAlign: "center" as const, // Không cần 'as "center"'
        fontSize: "0.875rem",
        color: "#6b7280",
    },
    link: {
        color: "#0070f3",
        textDecoration: "none",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "color 0.3s ease",
    },
    linkHover: {
        color: "#0056b3",
    },
};

export default Login;
