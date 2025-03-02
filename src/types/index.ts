export interface ICommand{
    name: string;
    action: () => Promise<void>;
}