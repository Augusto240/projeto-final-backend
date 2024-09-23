export interface Postagem {
    id: number;
    descricao: string;
    idUsuario: number;
    createdAt: string;
    updatedAt: string;
    usuario?: Usuario; // Adicionando a propriedade usuario como opcional
  }
  
  export interface Usuario {
    avatar: string;
    nome: string;
  }