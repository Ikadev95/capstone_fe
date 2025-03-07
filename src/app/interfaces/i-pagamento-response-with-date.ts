export interface iPagamentoResponseWithDate {
  data_pagamento: Date,
  metodo_pagamento: string,
  importo: number,
  stato_pagamento: string,
  ragione_pagamento: string,
  numero_poesie_pagate: number,
  numero_foto_pagate: number,
  id_user: number
}
