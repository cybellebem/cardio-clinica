import { useEffect, useState } from "react";

import { http } from "../../api/http";
import { useAuth } from "../../auth/AuthContext";

import "../../components/Modal.css";

export default function ConsultaModal({ isOpen, onClose }) {
  const { pessoa } = useAuth();

  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    data: "",
    hora: "",
    id_paciente: "",
    id_medico: pessoa?.id || "",
    sintomas: "",
    temperatura: "",
    peso: "",
    diagnostico: "",
    tratamento: "",
  });

  useEffect(() => {
    if (isOpen) carregarPacientes();
    else setValidated(false);
  }, [isOpen]);

  useEffect(() => {
    if (pessoa) {
      setFormData((prev) => ({ ...prev, id_medico: pessoa.id }));
    }
  }, [pessoa]);

  if (!isOpen) return null;

  async function carregarPacientes() {
    try {
      const response = await http.get("/pessoas/funcao/Paciente");
      setPacientes(response.data.pessoas || []);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar pacientes");
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function applyDecimalMask(value, intDigits) {
    if (value.includes(".")) {
      const dotIndex = value.indexOf(".");
      const intPart = value.slice(0, dotIndex).replace(/\D/g, "").slice(0, intDigits);
      const decPart = value.slice(dotIndex + 1).replace(/\D/g, "").slice(0, 1);
      return intPart + "." + decPart;
    }
    const digits = value.replace(/\D/g, "").slice(0, intDigits + 1);
    return digits.length === intDigits + 1
      ? digits.slice(0, intDigits) + "." + digits.slice(intDigits)
      : digits;
  }

  function handleTemperaturaInput(e) {
    setFormData({ ...formData, temperatura: applyDecimalMask(e.target.value, 2) });
  }

  function handlePesoInput(e) {
    setFormData({ ...formData, peso: applyDecimalMask(e.target.value, 3) });
  }

  function handleHoraInput(e) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);

    let h = raw.slice(0, 2);
    let m = raw.slice(2, 4);

    if (h.length === 2 && parseInt(h, 10) > 23) h = "23";
    if (m.length === 2 && parseInt(m, 10) > 59) m = "59";

    const combined = h + m;
    const formatted =
      combined.length >= 3 ? combined.slice(0, 2) + ":" + combined.slice(2) : combined;

    setFormData({ ...formData, hora: formatted });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setValidated(true);

    if (!e.target.checkValidity()) return;

    try {
      setLoading(true);

      const payload = {
        ...formData,
        data_hora: `${formData.data}T${formData.hora}`,
      };
      delete payload.data;
      delete payload.hora;

      await http.post("/consultas/incluir", payload);

      alert("Consulta criada com sucesso");

      setFormData({
        data: "",
        hora: "",
        id_paciente: "",
        id_medico: pessoa.id,
        sintomas: "",
        temperatura: "",
        peso: "",
        diagnostico: "",
        tratamento: "",
      });

      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao criar consulta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Nova Consulta</h2>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <form id="consulta-form" className={`modal-form ${validated ? "was-validated" : ""}`} onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="data">Data</label>
              <input
                id="data"
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="hora">Hora</label>
              <input
                id="hora"
                type="text"
                inputMode="numeric"
                name="hora"
                placeholder="HH:MM"
                maxLength={5}
                value={formData.hora}
                onChange={handleHoraInput}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Médico responsável</label>
            <input
              type="text"
              value={pessoa?.nome || ""}
              disabled
            />
          </div>

          <div className="form-field">
            <label htmlFor="id_paciente">Paciente</label>
            <select
              id="id_paciente"
              name="id_paciente"
              value={formData.id_paciente}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o paciente</option>

              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="sintomas">Sintomas</label>
            <textarea
              id="sintomas"
              name="sintomas"
              placeholder="Descreva os sintomas relatados..."
              value={formData.sintomas}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="temperatura">Temperatura (°C)</label>
              <input
                id="temperatura"
                type="text"
                inputMode="decimal"
                name="temperatura"
                placeholder="Ex: 36.5"
                value={formData.temperatura}
                onChange={handleTemperaturaInput}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="peso">Peso (kg)</label>
              <input
                id="peso"
                type="text"
                inputMode="decimal"
                name="peso"
                placeholder="Ex: 70.0"
                value={formData.peso}
                onChange={handlePesoInput}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="diagnostico">Diagnóstico</label>
            <textarea
              id="diagnostico"
              name="diagnostico"
              placeholder="Descreva o diagnóstico..."
              value={formData.diagnostico}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="tratamento">Tratamento</label>
            <textarea
              id="tratamento"
              name="tratamento"
              placeholder="Descreva o tratamento prescrito..."
              value={formData.tratamento}
              onChange={handleChange}
              required
            />
          </div>
        </form>

        <div className="modal-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="consulta-form"
            className="save-button"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Consulta"}
          </button>
        </div>
      </div>
    </div>
  );
}
