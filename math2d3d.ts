namespace Math2d3d {
    export class Vector {
        _: Array<number>

        protected factory(): Vector {
            return null
        }

        protected constructor() {
            this._ = []
        }

        public add(v: Vector): any {
            let ret = v.factory()
            for (let i = 0; i < this._.length; i++) {
                ret._[i] = this._[i] + v._[i]
            }
            return ret
        }

        public sub(v: Vector): any {
            let ret = this.factory()
            for (let i = 0; i < this._.length; i++) {
                ret._[i] = this._[i] - v._[i]
            }
            return ret
        }

        public scale(s: number): any {
            let ret = this.factory()
            for (let i = 0; i < this._.length; i++) {
                ret._[i] = ret._[i] * s
            }
            return ret
        }

        public dot(v: Vector): number {
            let ret = 0
            for (let i = 0; i < this._.length; i++) {
                ret += this._[i] * v._[i]
            }
            return ret
        }

        public magSquared(): number {
            return this.dot(this)
        }

        public mag(): number {
            return Math.sqrt(this.dot(this))
        }

        public normalize(): void {
            let magR = 1 / this.mag()
            for (let i = 0; i < this._.length; i++) {
                this._[i] = this._[i] * magR
            }
        }
    }

    export class Matrix {
        _: Array<number>

        protected constructor() {
            this._ = []
        }

        protected factory(): Matrix {
            return null
        }

        protected mul(v: Vector): Vector {
            return null
        }

        public populateFrom(m: Matrix): void {
            let length = m._.length
            for (let i = 0; i < length; i++) {
                this._[i] = m._[i]
            }
        }
    }
}
