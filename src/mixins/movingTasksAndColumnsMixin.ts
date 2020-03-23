import { Component, Prop, Vue } from "vue-property-decorator";
import { Column } from '@/models/Column';
import { Board } from '@/models/Board';
import { TransferDataPayload } from "@/models/TransferDataPayload";

@Component
export default class MovingClassAndColumnsMixin extends Vue {
    @Prop({ required: true }) column!: Column;
    @Prop({ required: true }) columnIndex!: number;
    @Prop({ required: true }) board!: Board;

    moveTaskOrColumn(transferData: TransferDataPayload) {
        if (transferData.type === "task") {
            this.moveTask(transferData);
        } else {
            this.moveColumn(transferData);
        }
    }

    moveTask(transferData: TransferDataPayload) {
        const fromTasks = this.board.columns[transferData.fromColumnIndex].tasks;
        // eslint-disable-next-line
        const self = this as any;

        this.$store.commit("MOVE_TASK", {
            fromColumn: fromTasks,
            toColumn: this.column.tasks,
            fromTaskIndex: transferData.fromTaskIndex,
            toTaskIndex: self.taskIndex
        });
    }

    moveColumn(transferData: TransferDataPayload) {
        this.$store.commit("MOVE_COLUMN", {
            fromColumnIndex: transferData.fromColumnIndex,
            toColumnIndex: this.columnIndex
        });
    }
}