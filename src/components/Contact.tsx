import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  MESSAGES,
  WHATSAPP_DISPLAY,
} from "../data/site";
import { cn } from "../lib/cn";
import {
  addDays,
  formatDate,
  getWhatsAppUrl,
  todayIso,
} from "../lib/whatsapp";
import { CtaLink } from "./CtaLink";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

type FormState = {
  nombre: string;
  ingreso: string;
  salida: string;
  huespedes: string;
  cabana: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  nombre: "",
  ingreso: "",
  salida: "",
  huespedes: "2",
  cabana: "",
  mensaje: "",
};

const CABIN_OPTIONS = [
  { value: "", label: "A definir" },
  { value: "cabana-1", label: "Cabaña 1 · hasta 5 personas" },
  { value: "cabana-2", label: "Cabaña 2 · hasta 3 personas" },
];

function cabinLabelFor(value: string): string {
  return CABIN_OPTIONS.find((option) => option.value === value)?.label ?? "A definir";
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (values.nombre.trim().length < 2) {
    errors.nombre = "Contanos tu nombre.";
  }
  if (!values.ingreso) {
    errors.ingreso = "Elegí la fecha de ingreso.";
  }
  if (!values.salida) {
    errors.salida = "Elegí la fecha de salida.";
  } else if (values.ingreso && values.salida <= values.ingreso) {
    errors.salida = "Tiene que ser posterior al ingreso.";
  }
  if (!values.huespedes) {
    errors.huespedes = "Indicá cuántos viajan.";
  } else if (values.cabana === "cabana-2" && Number(values.huespedes) > 3) {
    errors.huespedes = "La Cabaña 2 admite hasta 3 huéspedes.";
  }
  return errors;
}

function buildMessage(values: FormState): string {
  const lines = [
    "Hola, quisiera consultar disponibilidad en La Casa de Francisco.",
    "",
    `Nombre: ${values.nombre.trim()}`,
    `Ingreso: ${formatDate(values.ingreso)}`,
    `Salida: ${formatDate(values.salida)}`,
    `Huéspedes: ${values.huespedes}`,
    `Cabaña: ${cabinLabelFor(values.cabana)}`,
  ];

  if (values.mensaje.trim()) {
    lines.push(`Mensaje: ${values.mensaje.trim()}`);
  }

  lines.push("", "¿Me podrían confirmar disponibilidad y tarifas?");
  return lines.join("\n");
}

const fieldBase =
  "mt-2.5 w-full border-b bg-transparent px-0 pb-2.5 pt-1 text-[0.92rem] text-ink transition-colors duration-300 placeholder:text-ink/35 focus:outline-none";

export function Contact() {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<
    { type: "idle" } | { type: "error" } | { type: "success"; url: string }
  >({ type: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const today = todayIso();
  const minCheckout = values.ingreso ? addDays(values.ingreso, 1) : addDays(today, 1);

  const update =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => {
        if (!current[field]) return current;
        const next = { ...current };
        delete next[field];
        return next;
      });
      setResult({ type: "idle" });
    };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setResult({ type: "error" });
      const field = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstError}"]`,
      );
      field?.focus();
      return;
    }

    const url = getWhatsAppUrl(buildMessage(values));
    setResult({ type: "success", url });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass = (field: keyof FormState) =>
    cn(
      fieldBase,
      errors[field]
        ? "border-[#a8452f]"
        : "border-olive/20 focus:border-olive",
    );

  return (
    <section id="contacto" className="bg-cream py-20 sm:py-24 lg:py-32">
      <div className={cn("shell")}>
        <div className="grid overflow-hidden bg-olive lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative hidden min-h-[660px] lg:block">
            <Photo
              name="interior-comedor"
              alt="Interior cálido de la cocina y el comedor de una de las cabañas."
              sizes="(max-width: 1024px) 0px, 42vw"
              className="absolute inset-0 h-full w-full"
            />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-olive-ink via-olive-ink/65 to-olive-ink/20"
              />
            <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
              <p className="flex items-center gap-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-cream/50">
                <span aria-hidden="true" className="h-px w-6 bg-cream/35" />
                La Casa de Francisco · Merlo
              </p>
              <div>
                <p className="eyebrow text-cream/70">Contacto</p>
                <h2 className="section-title mt-5 text-cream">
                  Tu próxima escapada empieza acá.
                </h2>
                <p className="mt-5 max-w-[24rem] text-[0.95rem] leading-[1.8] text-cream/70">
                  Elegí la cabaña que mejor se adapte a vos y consultanos por
                  disponibilidad. Estamos para ayudarte a organizar tu estadía en
                  Merlo.
                </p>
                <div className="mt-8">
                  <CtaLink
                    href={getWhatsAppUrl(MESSAGES.general)}
                    variant="light"
                    icon="whatsapp"
                    external
                  >
                    Consultar disponibilidad por WhatsApp
                  </CtaLink>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[0.72rem] tracking-[0.06em] text-cream/60">
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {WHATSAPP_DISPLAY} · Merlo, San Luis
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cream">
            <div className="bg-olive p-6 text-cream sm:p-10 lg:hidden">
              <p className="eyebrow text-cream/70">Contacto</p>
              <h2 className="section-title mt-4 text-cream">
                Tu próxima escapada empieza acá.
              </h2>
              <p className="mt-4 max-w-[26rem] text-[0.95rem] leading-[1.8] text-cream/70">
                Elegí la cabaña que mejor se adapte a vos y consultanos por
                disponibilidad. Estamos para ayudarte a organizar tu estadía en
                Merlo.
              </p>
              <div className="mt-7">
                <CtaLink
                  href={getWhatsAppUrl(MESSAGES.general)}
                  variant="light"
                  icon="whatsapp"
                  external
                  fullWidth
                  mobileLabel="Consultar por WhatsApp"
                >
                  Consultar disponibilidad por WhatsApp
                </CtaLink>
              </div>
              <p className="mt-4 flex items-center gap-2 text-[0.72rem] tracking-[0.06em] text-cream/60">
                <Icon name="whatsapp" className="h-4 w-4" />
                {WHATSAPP_DISPLAY} · Merlo, San Luis
              </p>
            </div>

            <div className="p-6 text-ink sm:p-10 xl:p-14">
              <p className="hidden eyebrow text-clay lg:block">
                Consulta de disponibilidad
              </p>
              <h3 className="mt-4 font-display text-[1.75rem] leading-tight text-olive lg:text-[2rem]">
                Contanos qué necesitás
              </h3>
              <p className="mt-2 max-w-[26rem] text-[0.82rem] leading-relaxed text-ink/70">
                Completá los datos y te llevamos a WhatsApp con la consulta ya
                escrita.
              </p>

              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="mt-8"
                aria-describedby="form-note"
              >
                <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="nombre"
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-olive/80"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      value={values.nombre}
                      onChange={update("nombre")}
                      required
                      aria-invalid={Boolean(errors.nombre)}
                      aria-describedby={errors.nombre ? "nombre-error" : undefined}
                      className={inputClass("nombre")}
                    />
                    {errors.nombre && (
                      <p id="nombre-error" className="mt-1.5 text-[0.68rem] text-[#a8452f]">
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="ingreso"
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-olive/80"
                    >
                      Ingreso
                    </label>
                    <input
                      id="ingreso"
                      name="ingreso"
                      type="date"
                      min={today}
                      value={values.ingreso}
                      onChange={update("ingreso")}
                      required
                      aria-invalid={Boolean(errors.ingreso)}
                      aria-describedby={errors.ingreso ? "ingreso-error" : undefined}
                      className={inputClass("ingreso")}
                    />
                    {errors.ingreso && (
                      <p id="ingreso-error" className="mt-1.5 text-[0.68rem] text-[#a8452f]">
                        {errors.ingreso}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="salida"
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-olive/80"
                    >
                      Salida
                    </label>
                    <input
                      id="salida"
                      name="salida"
                      type="date"
                      min={minCheckout}
                      value={values.salida}
                      onChange={update("salida")}
                      required
                      aria-invalid={Boolean(errors.salida)}
                      aria-describedby={errors.salida ? "salida-error" : undefined}
                      className={inputClass("salida")}
                    />
                    {errors.salida && (
                      <p id="salida-error" className="mt-1.5 text-[0.68rem] text-[#a8452f]">
                        {errors.salida}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="huespedes"
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-olive/80"
                    >
                      Huéspedes
                    </label>
                    <div className="relative">
                      <select
                        id="huespedes"
                        name="huespedes"
                        value={values.huespedes}
                        onChange={update("huespedes")}
                        required
                        aria-invalid={Boolean(errors.huespedes)}
                        aria-describedby={
                          errors.huespedes ? "huespedes-error" : undefined
                        }
                        className={cn(inputClass("huespedes"), "appearance-none pr-7")}
                      >
                        {[1, 2, 3, 4, 5].map((count) => (
                          <option key={count} value={String(count)}>
                            {count} {count === 1 ? "huésped" : "huéspedes"}
                          </option>
                        ))}
                      </select>
                      <Icon
                        name="chevronRight"
                        className="pointer-events-none absolute bottom-3.5 right-0 h-3.5 w-3.5 rotate-90 text-olive/45"
                      />
                    </div>
                    {errors.huespedes && (
                      <p id="huespedes-error" className="mt-1.5 text-[0.68rem] text-[#a8452f]">
                        {errors.huespedes}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cabana"
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-olive/80"
                    >
                      Cabaña de interés
                    </label>
                    <div className="relative">
                      <select
                        id="cabana"
                        name="cabana"
                        value={values.cabana}
                        onChange={update("cabana")}
                        className={cn(inputClass("cabana"), "appearance-none pr-7")}
                      >
                        {CABIN_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Icon
                        name="chevronRight"
                        className="pointer-events-none absolute bottom-3.5 right-0 h-3.5 w-3.5 rotate-90 text-olive/45"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="mensaje"
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-olive/80"
                    >
                      Mensaje adicional{" "}
                      <span className="normal-case tracking-normal text-olive/65">
                        (opcional)
                      </span>
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={3}
                      maxLength={500}
                      placeholder="¿Algo que debamos saber? Consultanos."
                      value={values.mensaje}
                      onChange={update("mensaje")}
                      className={cn(inputClass("mensaje"), "resize-none")}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-olive px-5 py-3.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cream transition-colors duration-300 hover:bg-olive-deep sm:w-auto sm:gap-3 sm:px-7 sm:py-4 sm:text-[0.7rem] sm:tracking-[0.16em]"
                  >
                    <Icon name="whatsapp" className="h-4 w-4 shrink-0" />
                    <span>Preparar consulta en WhatsApp</span>
                    <Icon
                      name="arrowRight"
                      className="hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:block"
                    />
                  </button>
                  <a
                    href={getWhatsAppUrl(MESSAGES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-olive/80 underline-offset-4 transition-colors hover:text-olive hover:underline"
                  >
                    O escribinos directamente
                  </a>
                </div>

                <div id="form-note" className="mt-5 space-y-3">
                  <p className="text-[0.68rem] leading-relaxed text-ink/65">
                    Al enviar se abre WhatsApp con tu consulta preparada. Este
                    formulario no confirma ninguna reserva y no envía datos a
                    ningún servidor.
                  </p>
                  <p className="text-[0.68rem] leading-relaxed text-ink/65">
                    Las fechas están sujetas a confirmación por parte del
                    alojamiento.
                  </p>
                </div>

                <div aria-live="polite">
                  {result.type === "error" && (
                    <p className="mt-5 border-l-2 border-[#a8452f] bg-[#a8452f]/5 py-2.5 pl-3 text-[0.78rem] text-[#8a3827]">
                      Revisá los datos marcados para continuar.
                    </p>
                  )}
                  {result.type === "success" && (
                    <div className="mt-5 border-l-2 border-sage bg-sand/50 py-3 pl-3 pr-3 text-[0.78rem] leading-relaxed text-ink/70">
                      Abrimos WhatsApp con tu consulta. Si la pestaña no se abrió,{" "}
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-olive underline underline-offset-4"
                      >
                        tocá acá
                      </a>
                      . La disponibilidad se confirma por esa vía.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
