import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Imię jest wymagane")
    .min(2, "Imię musi mieć co najmniej 2 znaki"),
  lastName: yup
    .string()
    .required("Nazwisko jest wymagane")
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  email: yup
    .string()
    .email("Niepoprawny adres email")
    .required("Email jest wymagany"),
  password: yup
    .string()
    .required("Hasło jest wymagane")
    .min(6, "Hasło musi mieć co najmniej 6 znaków"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Hasła muszą się zgadzać")
    .required("Potwierdzenie hasła jest wymagane"),
});

type FormData = yup.InferType<typeof schema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        "http://localhost:5000/users?email=" + data.email
      );
      const existing = await res.json();

      if (existing.length > 0) {
        setError("Użytkownik z tym adresem email już istnieje.");
        return;
      }

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: "user",
          createdAt: new Date().toISOString(),
        }),
      });

      navigate("/login");
    } catch (err) {
      setError("Wystąpił błąd podczas rejestracji.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Rejestracja</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block font-medium mb-1">
            Imię
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block font-medium mb-1">
            Nazwisko
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Hasło
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            Potwierdź hasło
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
