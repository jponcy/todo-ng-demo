interface TodoBase {
  /** Technical id. */
  id: number;

  /** Label of task. */
  label: string;

  /** Description of task. */
  description: string;

  /** Date of moment where todo was created. */
  createdAt: Date;

  /** Date of last time where todo was updated. */
  updatedAt: Date;

  /** Date of completion. */
  finishedAt: Date;
}

export interface Todo extends TodoBase {
  /** The associated tags. */
  tags: Tag[];
}

export interface TodoDto extends TodoBase {
  /** The id to use to get associated tags. */
  tags: number[];
}

export interface Tag {
   /** Technical id. */
   id: number;

   /** Label of task. */
   name: string;
}
