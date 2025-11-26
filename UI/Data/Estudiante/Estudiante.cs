using System.ComponentModel.DataAnnotations; // <--- ¡IMPORTANTE!

namespace UI.Data.Estudiante
{
    public class Estudiante
    {
        public int? codigo { get; set; } // Puede ser nulo porque la BD lo genera

        [Required(ErrorMessage = "Debes seleccionar un tipo de documento.")]
        public string? tipodocumento { get; set; }

        [Required(ErrorMessage = "El número de documento es obligatorio.")]
        [StringLength(10, ErrorMessage = "El documento es muy largo (máximo 10 caracteres).")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "El documento solo puede contener números.")]
        public string? documento { get; set; }

        [Required(ErrorMessage = "El primer nombre es obligatorio.")]
        public string? nombreuno { get; set; }

        public string? nombredos { get; set; } // Este lo dejamos opcional

        [Required(ErrorMessage = "El primer apellido es obligatorio.")]
        public string? apellidouno { get; set; }

        public string? apellidodos { get; set; } // Este lo dejamos opcional

        [Required(ErrorMessage = "Debes seleccionar el sexo.")]
        public string? sexo { get; set; }

        [Required(ErrorMessage = "Debes seleccionar el RH.")]
        public string? rh { get; set; }

        [Required(ErrorMessage = "La dirección es obligatoria.")]
        public string? direccion { get; set; }

        [Required(ErrorMessage = "El teléfono es obligatorio.")]
        [Phone(ErrorMessage = "El formato del teléfono no es válido.")]
        public string? telefono { get; set; }

        // La fecha suele generarse automáticamente, pero si la necesitas validar:
        public string? fecha { get; set; } 
    }
}