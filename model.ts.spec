
// Users
type User = {
  id: string; // uuid
  email: string;
  password: string;
}

// Content
enum ContentType {
  NOTE = 'note',
  LIST = 'list',
}

type ContentBase = {
  id: string; // uuid
  title: string;
};

type NoteContent = {
  type: ContentType.NOTE;
  content: string;
};

type ListContent = {
  type: ContentType.LIST;
  entries: ListEntry[];
};

type ListEntry = {
  content: string;
  dueDate?: string;
};

type Content = ContentBase & (NoteContent | ListContent);
