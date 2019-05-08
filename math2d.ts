namespace Math2d {
    export class VectorXYw extends Math2d3d.Vector {
        private constructor() {
            super()
        }

        private init(x: number, y: number, w: number): VectorXYw {
            this._[0] = x; this._[1] = y; this._[2] = w
            return this
        }

        public static position(x: number, y: number): VectorXYw {
            return new VectorXYw().init(x, y, 1)
        }

        public static direction(x: number, y: number): VectorXYw {
            return new VectorXYw().init(x, y, 0)
        }

        public static zero(): VectorXYw {
            return VectorXYw.direction(0, 0)
        }

        public factory(): VectorXYw {
            return new VectorXYw()
        }

        public getX(): number { return this._[0] }
        public setX(val: number): void { this._[0] = val }
        public getY(): number { return this._[1] }
        public setY(val: number): void { this._[1] = val }
        public getW(): number { return this._[2] }
        public setW(val: number): void { this._[2] = val }
    }

    export class Matrix33 extends Math2d3d.Matrix {
        private constructor() {
            super()
        }

        public static identity(): Matrix33 {
            let ret = new Matrix33()
            let _ = ret._
            _[0] = 1; _[1] = 0; _[2] = 0
            _[3] = 0; _[4] = 1; _[5] = 0
            _[6] = 0; _[7] = 0; _[8] = 0
            return ret
        }

        public static rotation(t: number): Matrix33 {
            let ret = new Matrix33()
            let _ = ret._
            _[0] = Math.cos(t); _[1] = -Math.sin(t); _[2] = 0
            _[3] = Math.sin(t); _[4] = Math.cos(t); _[5] = 0
            _[6] = 0; _[7] = 0; _[8] = 1
            return ret
        }

        public factory(): Matrix33 {
            return new Matrix33()
        }

        public mul(v: VectorXYw): VectorXYw {
            let r = VectorXYw.zero()
            let _ = this._

            /*
            r._[0] = v.dot(this.getXAxis())
            r._[1] = v.dot(this.getYAxis())
            r._[2] = v.dot(this.getTranslation())
            */

            r._[0] = _[0] * v._[0] + _[1] * v._[1] + _[2] * v._[2]
            r._[1] = _[3] * v._[0] + _[4] * v._[1] + _[5] * v._[2]
            r._[2] = _[6] * v._[0] + _[7] * v._[1] + _[8] * v._[2]
            return r
        }

        public transpose(): Matrix33 {
            let r = new Matrix33()
            let _ = this._
            r._[0] = _[0]; r._[1] = _[3]; r._[2] = _[6]
            r._[3] = _[1]; r._[4] = _[4]; r._[5] = _[7]
            r._[6] = _[2]; r._[7] = _[5]; r._[8] = _[8]
            return r
        }

        public getXAxis(): VectorXYw {
            return VectorXYw.direction(this._[0], this._[1])
        }

        public setXAxis(v: VectorXYw): void {
            this._[0] = v._[0]; this._[1] = v._[1]; this._[2] = 0
        }

        public getYAxis(): VectorXYw {
            return VectorXYw.direction(this._[3], this._[4])
        }

        public setYAxis(v: VectorXYw): void {
            this._[3] = v._[0]; this._[4] = v._[1]; this._[5] = 0
        }

        public getTranslation(): VectorXYw {
            return VectorXYw.position(this._[6], this._[7])
        }

        public setTranslation(v: VectorXYw) {
            this._[6] = v._[0]; this._[7] = v._[1]; this._[8] = 1
        }
    }
}